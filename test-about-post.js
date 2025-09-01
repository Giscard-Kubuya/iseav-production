// Test About POST functionality
const testAboutPost = async () => {
  const testData = {
    website_id: 1,
    hero_title: 'Test CEPAC Title',
    hero_subtitle: 'Test subtitle for POST operation',
    organization_description: 'Test organization description',
    our_story: 'Test our story content',
    why_choose_us: [
      {
        title: 'Test Reason 1',
        description: 'Test description 1',
        icon: '🎯'
      },
      {
        title: 'Test Reason 2', 
        description: 'Test description 2',
        icon: '🌟'
      }
    ],
    achievements: [
      {
        title: 'Test Achievement',
        count: '100+',
        description: 'Test achievement description'
      }
    ],
    certifications: [
      {
        name: 'Test Certification',
        description: 'Test cert description',
        year: '2024'
      }
    ],
    team_intro: 'Test team introduction',
    impact_statement: 'Test impact statement',
    future_goals: 'Test future goals',
    call_to_action_title: 'Test CTA Title',
    call_to_action_description: 'Test CTA description',
    is_active: true
  };

  try {
    console.log('Testing About POST with data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('https://new-api.projetcepacbeni.org/api/about', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Website-ID': '1',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.text();
    console.log('Response body:', responseData);
    
    if (!response.ok) {
      console.error('POST failed with status:', response.status);
      try {
        const errorData = JSON.parse(responseData);
        console.error('Error details:', errorData);
      } catch (e) {
        console.error('Could not parse error response as JSON');
      }
    } else {
      console.log('POST succeeded!');
    }
    
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Export for Node.js if available, otherwise make global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = testAboutPost;
} else {
  window.testAboutPost = testAboutPost;
}

console.log('About POST test function ready. Call testAboutPost() to run.');