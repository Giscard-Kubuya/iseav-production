#!/usr/bin/env node

import fetch from 'node-fetch';

// Configuration
const API_BASE_URL = 'http://localhost:8080';
const WEBSITE_ID = 8;

/**
 * Update text by replacing CEPAC with Projet 8e CEPAC Beni
 */
function updateCepacText(text) {
  if (!text) return text;
  return text.replace(/CEPAC/g, 'Projet 8e CEPAC Beni');
}

/**
 * Update tags array by replacing CEPAC with Projet 8e CEPAC Beni
 */
function updateCepacTags(tags) {
  if (!Array.isArray(tags)) return tags;
  return tags.map(tag => tag === 'CEPAC' ? 'Projet 8e CEPAC Beni' : tag);
}

/**
 * Fetch all gallery items for the website
 */
async function fetchGalleryItems() {
  try {
    console.log('Fetching all gallery items...');
    const response = await fetch(`${API_BASE_URL}/api/gallery-items?per_page=100`, {
      headers: {
        'Website-ID': WEBSITE_ID.toString()
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch gallery items: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching gallery items:', error.message);
    return [];
  }
}

/**
 * Update a single gallery item
 */
async function updateGalleryItem(item) {
  try {
    console.log(`Updating gallery item ${item.id}: ${item.title}...`);

    // Prepare updated data
    const updatedData = {
      title: updateCepacText(item.title),
      description: updateCepacText(item.description),
      alt_text: updateCepacText(item.alt_text),
      tags: JSON.stringify(updateCepacTags(item.tags))
    };

    console.log(`  Title: "${item.title}" → "${updatedData.title}"`);

    const response = await fetch(`${API_BASE_URL}/api/gallery-items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Website-ID': WEBSITE_ID.toString()
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to update item ${item.id}:`, errorText);
      return false;
    }

    const result = await response.json();
    console.log(`  ✅ Successfully updated item ${item.id}`);
    return true;

  } catch (error) {
    console.error(`❌ Error updating item ${item.id}:`, error.message);
    return false;
  }
}

/**
 * Main function to update all gallery items
 */
async function updateAllGalleryItems() {
  console.log('🚀 Starting CEPAC name updates...');
  
  try {
    // Fetch all gallery items
    const galleryItems = await fetchGalleryItems();
    
    if (galleryItems.length === 0) {
      console.log('No gallery items found.');
      return;
    }

    console.log(`Found ${galleryItems.length} gallery items to update\n`);

    let updated = 0;
    let failed = 0;

    // Update each gallery item
    for (const item of galleryItems) {
      const success = await updateGalleryItem(item);
      
      if (success) {
        updated++;
      } else {
        failed++;
      }
      
      // Add small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 Update process complete!');
    console.log(`✅ Successfully updated: ${updated} items`);
    console.log(`❌ Failed: ${failed} items`);

  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
updateAllGalleryItems();