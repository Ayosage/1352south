'use client';

import PropertyCard from './PropertyCard';
import { motion } from 'framer-motion';

export default function PropertyList({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg text-gray-600">No properties match your search criteria.</h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters or search for a different location.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: property.id * 0.1, duration: 0.5 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </div>
  );
}