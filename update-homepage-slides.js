#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

// Configuration
const IMAGES_FOLDER = '../image-cepac';
const API_BASE_URL = 'http://localhost:8080';
const WEBSITE_ID = 8;

// Selected images for homepage (3 best ones)
const SELECTED_IMAGES = [
  {
    filename: 'WhatsApp Image 2025-08-31 at 9.06.26 PM.jpeg',
    title: 'Recherche de Terrain - Projet 8e CEPAC Beni',
    subtitle: 'Excellence dans la recherche communautaire',
    description: 'Notre équipe mène des recherches approfondies sur le terrain dans le cadre du projet WATALINGA 2025, collectant des données précieuses pour le développement communautaire.',
    primary_action_text: 'Découvrir nos recherches',
    primary_action_url: '/actualites',
    secondary_action_text: 'Nous rejoindre',
    secondary_action_url: '/contact',
    display_order: 1
  },
  {
    filename: 'WhatsApp Image 2025-08-31 at 9.06.28 PM(1).jpeg', 
    title: 'Engagement Communautaire - Projet 8e CEPAC Beni',
    subtitle: 'Transformons ensemble les communautés',
    description: 'Nous engageons directement avec les communautés locales pour comprendre leurs besoins et développer des solutions durables qui améliorent leur qualité de vie.',
    primary_action_text: 'Nos programmes',
    primary_action_url: '/services',
    secondary_action_text: 'Participez',
    secondary_action_url: '/contact',
    display_order: 2
  },
  {
    filename: 'WhatsApp Image 2025-08-31 at 9.08.44 PM.jpeg',
    title: 'Impact Social - Projet 8e CEPAC Beni',
    subtitle: 'Un avenir meilleur pour tous',
    description: 'À travers nos initiatives de terrain, nous créons un impact social positif et durable, renforçant les capacités des communautés rurales et urbaines de la région de Beni.',
    primary_action_text: 'Voir notre impact',
    primary_action_url: '/about',
    secondary_action_text: 'Soutenir notre mission',
    secondary_action_url: '/contact',
    display_order: 3
  }
];

/**
 * Upload image to Cloudinary via API
 */
async function uploadImageToCloudinary(imagePath, filename) {
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('module', 'hero-slides');

    console.log(`Uploading ${filename} to Cloudinary...`);
    const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Website-ID': WEBSITE_ID.toString()
      }
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Upload failed: ${result.error}`);
    }

    console.log(`✅ Successfully uploaded ${filename}`);
    return result.data.url;

  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

/**
 * Update existing hero slide with new image and content
 */
async function updateHeroSlide(slideId, slideData, imageUrl) {
  try {
    console.log(`Updating hero slide ${slideId}...`);

    const updateData = {
      title: slideData.title,
      subtitle: slideData.subtitle,
      description: slideData.description,
      image_url: imageUrl,
      primary_action_text: slideData.primary_action_text,
      primary_action_url: slideData.primary_action_url,
      secondary_action_text: slideData.secondary_action_text,
      secondary_action_url: slideData.secondary_action_url,
      is_active: 1,
      display_order: slideData.display_order
    };

    const response = await fetch(`${API_BASE_URL}/api/hero-slides/${slideId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Website-ID': WEBSITE_ID.toString()
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    console.log(`✅ Successfully updated hero slide ${slideId}`);
    return true;

  } catch (error) {
    console.error(`❌ Failed to update slide ${slideId}:`, error.message);
    return false;
  }
}

/**
 * Main function to update homepage slides
 */
async function updateHomepageSlides() {
  console.log('🚀 Starting homepage slides update...');
  
  try {
    // Get current slides
    console.log('Fetching current hero slides...');
    const slidesResponse = await fetch(`${API_BASE_URL}/api/hero-slides`, {
      headers: {
        'Website-ID': WEBSITE_ID.toString()
      }
    });

    if (!slidesResponse.ok) {
      throw new Error('Failed to fetch current slides');
    }

    const slidesData = await slidesResponse.json();
    const currentSlides = slidesData.data || [];

    if (currentSlides.length < 3) {
      throw new Error('Not enough existing slides to update');
    }

    console.log(`Found ${currentSlides.length} existing slides\n`);

    let processed = 0;
    let failed = 0;

    // Process each selected image
    for (let i = 0; i < SELECTED_IMAGES.length; i++) {
      const slideData = SELECTED_IMAGES[i];
      const currentSlide = currentSlides[i];
      const imagePath = path.join(IMAGES_FOLDER, slideData.filename);

      console.log(`\n📸 Processing slide ${i + 1}/3: ${slideData.filename}`);

      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(imagePath, slideData.filename);
      
      if (!imageUrl) {
        failed++;
        continue;
      }

      // Update the hero slide
      const success = await updateHeroSlide(currentSlide.id, slideData, imageUrl);
      
      if (success) {
        processed++;
      } else {
        failed++;
      }

      // Add delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n🎉 Homepage slides update complete!');
    console.log(`✅ Successfully updated: ${processed} slides`);
    console.log(`❌ Failed: ${failed} slides`);

  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
updateHomepageSlides();