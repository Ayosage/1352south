// Mock property data for demonstration
export const properties = [
  {
    id: 1,
    address: {
      street: '1352 South Street',
      city: 'Philadelphia',
      state: 'PA',
      zipCode: '19147'
    },
    price: 689000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2100,
    propertyType: 'house',
    description: 'Beautiful modern home with open floor plan, updated kitchen, and private backyard oasis.',
    features: ['Hardwood floors', 'Granite countertops', 'Stainless steel appliances', 'Walk-in closets', 'Smart home features'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
  },
  {
    id: 2,
    address: {
      street: '873 Delaware Avenue',
      city: 'Center City',
      state: 'PA',
      zipCode: '19106'
    },
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2850,
    propertyType: 'house',
    description: 'Stunning waterfront property with panoramic ocean views, private dock, and resort-style pool area.',
    features: ['Ocean view', 'Private dock', 'Resort-style pool', 'Outdoor kitchen', 'Hurricane impact windows'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
  },
  {
    id: 3,
    address: {
      street: '450 Brickell Ave, Unit 2505',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131'
    },
    price: 879000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1350,
    propertyType: 'condo',
    description: 'Luxury high-rise condo with breathtaking city and bay views, featuring high-end finishes throughout.',
    features: ['Floor-to-ceiling windows', 'Balcony', 'Building amenities include gym, spa, and pool', '24-hour concierge', 'Secure parking'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
  },
  {
    id: 4,
    address: {
      street: '241 Palm Avenue',
      city: 'Coral Gables',
      state: 'FL',
      zipCode: '33134'
    },
    price: 1795000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 3800,
    propertyType: 'house',
    description: 'Classic Mediterranean-style estate with lush landscaping, pool, and guest house in prestigious neighborhood.',
    features: ['Circular driveway', 'Swimming pool', 'Guest house', 'Outdoor living area', 'Gourmet kitchen'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
  },
  {
    id: 5,
    address: {
      street: '125 Sunshine Boulevard',
      city: 'North Miami',
      state: 'FL',
      zipCode: '33161'
    },
    price: 425000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1750,
    propertyType: 'townhouse',
    description: 'Recently renovated townhome with modern finishes, private courtyard, and attached garage.',
    features: ['Updated kitchen', 'New appliances', 'Private courtyard', 'Attached garage', 'Community pool'],
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
  },
  {
    id: 6,
    address: {
      street: '800 Collins Avenue, #305',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139'
    },
    price: 749000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    propertyType: 'condo',
    description: 'Art Deco gem steps from the beach with modern updates that retain historical charm and character.',
    features: ['Original Art Deco details', 'Updated kitchen and baths', 'Walk to beach', 'Rooftop deck', 'Parking included'],
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
  }
];

// Function to filter properties based on search parameters
export function filterProperties(searchParams) {
  let filteredProperties = [...properties];
  
  // Filter by address, city, zip, etc.
  if (searchParams.address) {
    const searchLower = searchParams.address.toLowerCase();
    filteredProperties = filteredProperties.filter(property => 
      property.address.street.toLowerCase().includes(searchLower) ||
      property.address.city.toLowerCase().includes(searchLower) ||
      property.address.zipCode.includes(searchParams.address)
    );
  }
  
  // Filter by price range
  if (searchParams.minPrice) {
    filteredProperties = filteredProperties.filter(property => 
      property.price >= Number(searchParams.minPrice)
    );
  }
  
  if (searchParams.maxPrice) {
    filteredProperties = filteredProperties.filter(property => 
      property.price <= Number(searchParams.maxPrice)
    );
  }
  
  // Filter by number of bedrooms
  if (searchParams.bedrooms) {
    filteredProperties = filteredProperties.filter(property => 
      property.bedrooms >= Number(searchParams.bedrooms)
    );
  }
  
  // Filter by number of bathrooms
  if (searchParams.bathrooms) {
    filteredProperties = filteredProperties.filter(property => 
      property.bathrooms >= Number(searchParams.bathrooms)
    );
  }
  
  // Filter by property type
  if (searchParams.propertyType && searchParams.propertyType !== 'all') {
    filteredProperties = filteredProperties.filter(property => 
      property.propertyType === searchParams.propertyType
    );
  }
  
  return filteredProperties;
}