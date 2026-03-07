import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  screenPad: { padding: 16 },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 400,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  mapIcon: {
    marginBottom: 16,
  },
  mapText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  mapSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  mapMarker: {
    position: 'absolute',
    backgroundColor: '#3B82F6',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  marker1: {
    top: '30%',
    left: '40%',
  },
  marker2: {
    top: '50%',
    left: '60%',
  },
  marker3: {
    top: '70%',
    left: '35%',
  },
  buildingInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buildingTitle: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  buildingList: {
    // No additional styles needed
  },
  buildingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buildingName: {
    color: '#4B5563',
    marginLeft: 8,
    fontSize: 14,
  },
});

export const MapScreen: React.FC = () => {
  return (
    <View style={styles.screenPad}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color="#9CA3AF" style={styles.mapIcon} />
          <Text style={styles.mapText}>UT Dallas Campus Map</Text>
          <Text style={styles.mapSubtext}>
            Interactive map with building locations and navigation coming soon
          </Text>
        </View>
        
        {/* Mock map markers */}
        <View style={[styles.mapMarker, styles.marker1]} />
        <View style={[styles.mapMarker, styles.marker2]} />
        <View style={[styles.mapMarker, styles.marker3]} />
      </View>

      <View style={styles.buildingInfo}>
        <Text style={styles.buildingTitle}>Nearby Buildings</Text>
        <View style={styles.buildingList}>
          <View style={styles.buildingItem}>
            <Ionicons name="location" size={16} color="#3B82F6" />
            <Text style={styles.buildingName}>ECS Building - 0.2 mi</Text>
          </View>
          <View style={styles.buildingItem}>
            <Ionicons name="location" size={16} color="#3B82F6" />
            <Text style={styles.buildingName}>Student Union - 0.5 mi</Text>
          </View>
          <View style={styles.buildingItem}>
            <Ionicons name="location" size={16} color="#3B82F6" />
            <Text style={styles.buildingName}>Library - 0.3 mi</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
