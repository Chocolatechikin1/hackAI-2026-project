import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Linking, Platform, Alert, TextInput, Animated, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Conditional imports for native modules
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;
let Location: any = null;

// Only import native modules on non-web platforms
if (Platform.OS !== 'web') {
  try {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  } catch (error) {
    console.log('react-native-maps not available');
  }
  
  try {
    const expoLocation = require('expo-location');
    Location = expoLocation.default;
  } catch (error) {
    console.log('expo-location not available');
  }
}

const UTD_BUILDINGS = [
  { id: '1',   name: 'Berkner Hall',                                       abbr: 'BE',      lat: 32.987717, lng: -96.750458 },
  { id: '2',   name: 'Administration Building',                            abbr: 'AD',      lat: 32.989712, lng: -96.748367 },
  { id: '3',   name: 'Eugene McDermott Library',                           abbr: 'MC',      lat: 32.986958, lng: -96.747620 },
  { id: '4',   name: 'Activity Center',                                    abbr: 'AB',      lat: 32.985210, lng: -96.749306 },
  { id: '5',   name: 'Bioengineering and Sciences Building',               abbr: 'BSB',     lat: 32.991535, lng: -96.750046 },
  { id: '6',   name: 'Callier Center Richardson',                          abbr: 'CR',      lat: 32.992481, lng: -96.748535 },
  { id: '7',   name: 'Callier Center Richardson Addition',                 abbr: 'CRA',     lat: 32.991722, lng: -96.748421 },
  { id: '8',   name: 'Davidson-Gundy Alumni Center',                       abbr: 'DGA',     lat: 32.986183, lng: -96.746574 },
  { id: '9',   name: 'Capella Hall',                                       abbr: 'RHC',     lat: 32.991550, lng: -96.751419 },
  { id: '10',  name: 'Vega Hall',                                          abbr: 'RHV',     lat: 32.991116, lng: -96.754646 },
  { id: '11',  name: 'Andromeda Hall',                                     abbr: 'RHA',     lat: 32.990520, lng: -96.754654 },
  { id: '12',  name: 'Helix Hall',                                         abbr: 'RHH',     lat: 32.989975, lng: -96.753296 },
  { id: '13',  name: 'Sirius Hall',                                        abbr: 'RHS',     lat: 32.989975, lng: -96.751366 },
  { id: '14',  name: 'Canyon Creek Heights South',                         abbr: 'CH6',     lat: 32.980637, lng: -96.755341 },
  { id: '15',  name: 'Canyon Creek Heights North',                         abbr: 'CH7',     lat: 32.981586, lng: -96.755264 },
  { id: '16',  name: 'UV Phase 2 Building 14',                             abbr: null,      lat: 32.983006, lng: -96.756065 },
  { id: '17',  name: 'UV Phase 1 Building 2',                              abbr: null,      lat: 32.985264, lng: -96.754463 },
  { id: '18',  name: 'UV Phase 1 Building 3',                              abbr: null,      lat: 32.985138, lng: -96.755440 },
  { id: '19',  name: 'UV Phase 1 Building 4',                              abbr: null,      lat: 32.984886, lng: -96.754944 },
  { id: '20',  name: 'UV Phase 1 Building 5',                              abbr: null,      lat: 32.984749, lng: -96.755585 },
  { id: '21',  name: 'UV Phase 1 Building 6',                              abbr: null,      lat: 32.984470, lng: -96.754959 },
  { id: '22',  name: 'UV Phase 1 Building 7',                              abbr: null,      lat: 32.984409, lng: -96.755821 },
  { id: '23',  name: 'UV Phase 1 Building 8',                              abbr: null,      lat: 32.983952, lng: -96.756126 },
  { id: '24',  name: 'UV Phase 1 Building 9',                              abbr: null,      lat: 32.984154, lng: -96.755096 },
  { id: '25',  name: 'UV Phase 1 Building 10',                             abbr: null,      lat: 32.984028, lng: -96.754578 },
  { id: '26',  name: 'UV Phase 1 Building 11',                             abbr: null,      lat: 32.984280, lng: -96.754532 },
  { id: '27',  name: 'UV Phase 1 Building 12',                             abbr: null,      lat: 32.984844, lng: -96.754341 },
  { id: '28',  name: 'UV Phase 2 Building 15',                             abbr: null,      lat: 32.983257, lng: -96.756050 },
  { id: '29',  name: 'UV Phase 2 Building 16',                             abbr: null,      lat: 32.982975, lng: -96.755554 },
  { id: '30',  name: 'UV Phase 2 Building 17',                             abbr: null,      lat: 32.983101, lng: -96.755135 },
  { id: '31',  name: 'UV Phase 2 Building 18',                             abbr: null,      lat: 32.983231, lng: -96.754837 },
  { id: '32',  name: 'UV Phase 2 Building 19',                             abbr: null,      lat: 32.982727, lng: -96.755058 },
  { id: '33',  name: 'UV Phase 2 Building 20',                             abbr: null,      lat: 32.982353, lng: -96.754852 },
  { id: '34',  name: 'UV Phase 2 Building 21',                             abbr: null,      lat: 32.982254, lng: -96.755386 },
  { id: '35',  name: 'UV Phase 2 Building 22',                             abbr: null,      lat: 32.982204, lng: -96.755859 },
  { id: '36',  name: 'UV Phase 2 Building 23',                             abbr: null,      lat: 32.982506, lng: -96.756134 },
  { id: '37',  name: 'UV Phase 3 Building 24',                             abbr: null,      lat: 32.985256, lng: -96.753044 },
  { id: '38',  name: 'UV Phase 3 Building 25',                             abbr: null,      lat: 32.985237, lng: -96.752350 },
  { id: '39',  name: 'UV Phase 3 Building 26',                             abbr: null,      lat: 32.985176, lng: -96.751793 },
  { id: '40',  name: 'UV Phase 3 Building 27',                             abbr: null,      lat: 32.984810, lng: -96.751884 },
  { id: '41',  name: 'UV Phase 3 Building 28',                             abbr: null,      lat: 32.984447, lng: -96.751778 },
  { id: '42',  name: 'UV Phase 3 Building 29',                             abbr: null,      lat: 32.984547, lng: -96.752342 },
  { id: '43',  name: 'UV Phase 3 Building 30',                             abbr: null,      lat: 32.984612, lng: -96.752960 },
  { id: '44',  name: 'UV Phase 3 Building 31',                             abbr: null,      lat: 32.984852, lng: -96.753242 },
  { id: '45',  name: 'UV Phase 4 Building 33',                             abbr: null,      lat: 32.986107, lng: -96.755707 },
  { id: '46',  name: 'UV Phase 4 Building 34',                             abbr: null,      lat: 32.986431, lng: -96.755753 },
  { id: '47',  name: 'UV Phase 4 Building 35',                             abbr: null,      lat: 32.986824, lng: -96.755692 },
  { id: '48',  name: 'UV Phase 4 Building 36',                             abbr: null,      lat: 32.986748, lng: -96.755150 },
  { id: '49',  name: 'UV Phase 5 Building 38',                             abbr: null,      lat: 32.986217, lng: -96.754692 },
  { id: '50',  name: 'UV Phase 5 Building 39',                             abbr: null,      lat: 32.986107, lng: -96.754242 },
  { id: '51',  name: 'UV Phase 5 Building 40',                             abbr: null,      lat: 32.986439, lng: -96.754211 },
  { id: '52',  name: 'UV Phase 5 Building 41',                             abbr: null,      lat: 32.986813, lng: -96.754219 },
  { id: '53',  name: 'UV Phase 6 Building 43',                             abbr: null,      lat: 32.987358, lng: -96.754227 },
  { id: '54',  name: 'UV Phase 6 Building 44',                             abbr: null,      lat: 32.987499, lng: -96.754761 },
  { id: '55',  name: 'UV Phase 6 Building 45',                             abbr: null,      lat: 32.987968, lng: -96.754745 },
  { id: '56',  name: 'UV Phase 6 Building 46',                             abbr: null,      lat: 32.987892, lng: -96.754211 },
  { id: '57',  name: 'UV Phase 7 Building 48',                             abbr: null,      lat: 32.987450, lng: -96.755455 },
  { id: '58',  name: 'UV Phase 7 Building 49',                             abbr: null,      lat: 32.987984, lng: -96.755440 },
  { id: '59',  name: 'UV Phase 7 Building 50',                             abbr: null,      lat: 32.987976, lng: -96.755760 },
  { id: '60',  name: 'UV Phase 7 Building 51',                             abbr: null,      lat: 32.987480, lng: -96.755814 },
  { id: '61',  name: 'UV Phase 8 Building 53',                             abbr: null,      lat: 32.988873, lng: -96.753914 },
  { id: '62',  name: 'UV Phase 8 Building 54',                             abbr: null,      lat: 32.989323, lng: -96.753792 },
  { id: '63',  name: 'UV Phase 8 Building 55',                             abbr: null,      lat: 32.989410, lng: -96.753296 },
  { id: '64',  name: 'UV Phase 8 Building 56',                             abbr: null,      lat: 32.989456, lng: -96.752747 },
  { id: '65',  name: 'UV Phase 8 Building 57',                             abbr: null,      lat: 32.989323, lng: -96.752312 },
  { id: '66',  name: 'UV Phase 8 Building 58',                             abbr: null,      lat: 32.988880, lng: -96.752319 },
  { id: '67',  name: 'UV Phase 8 Building 59',                             abbr: null,      lat: 32.988827, lng: -96.752907 },
  { id: '68',  name: 'UV Phase 8A Building 61',                            abbr: null,      lat: 32.989010, lng: -96.755814 },
  { id: '69',  name: 'UV Phase 8A Building 62',                            abbr: null,      lat: 32.989517, lng: -96.755806 },
  { id: '70',  name: 'UV Phase 8A Building 63',                            abbr: null,      lat: 32.989609, lng: -96.755363 },
  { id: '71',  name: 'University Village Housing Office',                  abbr: null,      lat: 32.989395, lng: -96.754898 },
  { id: '72',  name: 'UV Phase 4 Clubhouse',                               abbr: null,      lat: 32.986366, lng: -96.755371 },
  { id: '73',  name: 'UV Phase 2 Clubhouse',                               abbr: null,      lat: 32.982773, lng: -96.755867 },
  { id: '74',  name: 'UV Phase 3 Clubhouse',                               abbr: null,      lat: 32.984440, lng: -96.753403 },
  { id: '75',  name: 'UV Phase 8 Clubhouse',                               abbr: null,      lat: 32.988838, lng: -96.753548 },
  { id: '76',  name: 'UV Phase 9 Building 66',                             abbr: null,      lat: 32.988701, lng: -96.751793 },
  { id: '77',  name: 'UV Phase 9 Building 67',                             abbr: null,      lat: 32.989330, lng: -96.751762 },
  { id: '78',  name: "Edith O'Donnell Arts & Technology Building",         abbr: 'ATC',     lat: 32.986137, lng: -96.747566 },
  { id: '79',  name: 'Engineering and Computer Science South',             abbr: 'ECSS',    lat: 32.986240, lng: -96.750420 },
  { id: '80',  name: 'Engineering and Computer Science West',              abbr: 'ECSW',    lat: 32.986191, lng: -96.751671 },
  { id: '81',  name: 'Erik Jonsson Academic Center',                       abbr: 'JO',      lat: 32.988895, lng: -96.748863 },
  { id: '82',  name: 'Facilities Management',                              abbr: 'FM',      lat: 32.992294, lng: -96.746658 },
  { id: '83',  name: 'Founders Building',                                  abbr: 'FO',      lat: 32.987701, lng: -96.749069 },
  { id: '84',  name: 'Founders North',                                     abbr: 'FN',      lat: 32.988144, lng: -96.749359 },
  { id: '85',  name: 'Founders Annex',                                     abbr: 'FA',      lat: 32.987690, lng: -96.749886 },
  { id: '86',  name: 'Karl Hoblitzelle Hall',                              abbr: 'HH',      lat: 32.986992, lng: -96.751633 },
  { id: '87',  name: 'Modular Lab 1',                                      abbr: 'ML1',     lat: 32.986870, lng: -96.752625 },
  { id: '88',  name: 'Modular Lab 2',                                      abbr: 'ML2',     lat: 32.986870, lng: -96.753288 },
  { id: '89',  name: 'Natural Science and Engineering Research Lab',       abbr: 'RL',      lat: 32.992561, lng: -96.750443 },
  { id: '90',  name: 'Naveen Jindal School of Management',                 abbr: 'JSOM',    lat: 32.985046, lng: -96.746803 },
  { id: '91',  name: 'Engineering and Computer Science North',             abbr: 'ECSN',    lat: 32.986992, lng: -96.750366 },
  { id: '92',  name: 'North Lab',                                          abbr: 'NL',      lat: 32.990318, lng: -96.749214 },
  { id: '93',  name: 'North Office Building',                              abbr: 'NB',      lat: 32.990067, lng: -96.749397 },
  { id: '94',  name: 'Physics Annex',                                      abbr: 'PHA',     lat: 32.989506, lng: -96.749931 },
  { id: '95',  name: 'Physics Building',                                   abbr: 'PHY',     lat: 32.989441, lng: -96.750381 },
  { id: '96',  name: 'Research and Operations Center',                     abbr: 'ROC',     lat: 32.986290, lng: -96.757126 },
  { id: '97',  name: 'Research and Operations Center West',                abbr: 'ROW',     lat: 32.986259, lng: -96.758545 },
  { id: '98',  name: 'Environmental Health and Safety Building',           abbr: 'SG',      lat: 32.990902, lng: -96.746864 },
  { id: '99',  name: 'Science Learning Center',                            abbr: 'SLC',     lat: 32.988235, lng: -96.750397 },
  { id: '100', name: 'Service Building',                                   abbr: 'SB',      lat: 32.991299, lng: -96.746429 },
  { id: '101', name: 'Student Services Building',                          abbr: 'SSB',     lat: 32.985943, lng: -96.748840 },
  { id: '102', name: 'Student Services Building Addition',                 abbr: 'SSA',     lat: 32.986092, lng: -96.749435 },
  { id: '103', name: 'Student Union',                                      abbr: 'SU',      lat: 32.986942, lng: -96.748840 },
  { id: '104', name: 'Synergy Park North',                                 abbr: 'SPN',     lat: 32.994007, lng: -96.752197 },
  { id: '105', name: 'Synergy Park North 2',                               abbr: 'SP2',     lat: 32.995022, lng: -96.753319 },
  { id: '106', name: 'Police',                                             abbr: 'PD',      lat: 32.991692, lng: -96.745720 },
  { id: '107', name: 'Waterview Science and Technology Center',            abbr: 'WSTC',    lat: 32.991985, lng: -96.757393 },
  { id: '108', name: 'Classroom Building',                                 abbr: 'CB',      lat: 32.989700, lng: -96.749344 },
  { id: '109', name: 'Maintenance Shop',                                   abbr: null,      lat: 32.985172, lng: -96.754837 },
  { id: '110', name: 'Cecil H. Green Hall',                                abbr: 'GR',      lat: 32.988659, lng: -96.747871 },
  { id: '111', name: 'University Theatre',                                 abbr: 'TH',      lat: 32.988445, lng: -96.748718 },
  { id: '112', name: 'Center for Vital Longevity',                         abbr: null,      lat: 32.834450, lng: -96.868790 },
  { id: '113', name: 'Center for BrainHealth',                             abbr: null,      lat: 32.824764, lng: -96.847488 },
  { id: '114', name: 'Brain Performance Institute',                        abbr: null,      lat: 32.824085, lng: -96.848244 },
  { id: '115', name: 'Callier Center Dallas',                              abbr: null,      lat: 32.813480, lng: -96.845978 },
  { id: '116', name: 'Crow Museum of Asian Art',                           abbr: null,      lat: 32.787910, lng: -96.799675 },
  { id: '117', name: 'UV Phase 9 Building 65',                             abbr: null,      lat: 32.988197, lng: -96.751900 },
  { id: '118', name: 'UV Phase 1A Laundry Center',                         abbr: null,      lat: 32.985104, lng: -96.754898 },
  { id: '119', name: 'UV Phase 1B Laundry Center',                         abbr: null,      lat: 32.983971, lng: -96.754875 },
  { id: '120', name: 'University Housing Office',                          abbr: null,      lat: 32.990547, lng: -96.754265 },
  { id: '121', name: 'Housing Storage Warehouse',                          abbr: null,      lat: 32.991302, lng: -96.753296 },
  { id: '122', name: 'Construction Maintenance Building 1',                abbr: 'CM1',     lat: 32.992615, lng: -96.746956 },
  { id: '123', name: 'Facilities Management Custodial and Surplus',        abbr: 'FMCS',    lat: 32.991722, lng: -96.747299 },
  { id: '124', name: 'Facilities Management Shop Building',                abbr: 'FMSB',    lat: 32.992222, lng: -96.746979 },
  { id: '125', name: 'Facilities Management Events Building',              abbr: 'FME',     lat: 32.992744, lng: -96.746628 },
  { id: '126', name: 'Facilities Management Storage Building',             abbr: 'FMF',     lat: 32.992416, lng: -96.745827 },
  { id: '127', name: 'Facilities Management Pole Barn',                    abbr: 'FMPB',    lat: 32.992287, lng: -96.746353 },
  { id: '128', name: 'Facilities Management Greenhouses',                  abbr: 'FMGH',    lat: 32.992737, lng: -96.746231 },
  { id: '129', name: 'Construction Maintenance Building 2',                abbr: 'CM2',     lat: 32.992706, lng: -96.746956 },
  { id: '130', name: 'Construction Maintenance Building 3',                abbr: 'CM3',     lat: 32.992802, lng: -96.746948 },
  { id: '131', name: 'Sciences Building',                                  abbr: 'SCI',     lat: 32.988945, lng: -96.750320 },
  { id: '132', name: 'Phase 1 Pool',                                       abbr: null,      lat: 32.985077, lng: -96.754669 },
  { id: '133', name: 'Phase 2 Pool',                                       abbr: null,      lat: 32.982670, lng: -96.755608 },
  { id: '134', name: 'Phase 3 Pool',                                       abbr: null,      lat: 32.984871, lng: -96.752457 },
  { id: '135', name: 'Phase 4 Pool',                                       abbr: null,      lat: 32.986423, lng: -96.755486 },
  { id: '136', name: 'Phase 8 Pool',                                       abbr: null,      lat: 32.988979, lng: -96.753372 },
  { id: '137', name: 'Richardson Innovation Quarter HQ',                   abbr: null,      lat: 32.967449, lng: -96.702652 },
  { id: '138', name: 'Sammons BrainHealth Imaging Center',                 abbr: null,      lat: 32.824154, lng: -96.848671 },
  { id: '139', name: "Edith and Peter O'Donnell Jr. Athenaeum",            abbr: 'APC',     lat: 32.983860, lng: -96.747261 },
  { id: '140', name: 'Texas Instruments Biomedical Engineering Building',  abbr: 'TI-BMES', lat: 32.818932, lng: -96.837891 },
  { id: '141', name: 'UTD Visitor Center',                                 abbr: null,      lat: 32.990540, lng: -96.750839 },
  { id: '142', name: 'Waterview Academic and Administrative Center',       abbr: 'WAAC',    lat: 32.990391, lng: -96.758049 },
  { id: '143', name: 'Activity Center Bookstore',                          abbr: 'ACB',     lat: 32.984619, lng: -96.749641 },
  { id: '144', name: 'Comets LANding',                                     abbr: null,      lat: 32.987286, lng: -96.749084 },
];

const UTD_CENTER = { latitude: 32.9880, longitude: -96.7501 };

type Building = (typeof UTD_BUILDINGS)[0];

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distLabel(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function openNavigation(lat: number, lng: number) {
  const url =
    Platform.OS === 'ios'
      ? `maps://app?daddr=${lat},${lng}&dirflg=w`
      : `google.navigation:q=${lat},${lng}&mode=w`;
  Linking.canOpenURL(url).then((ok) =>
    ok
      ? Linking.openURL(url)
      : Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`)
  );
}

// Web fallback — shown instead of the native map on web
const WebMapFallback = ({ theme }: { theme: any }) => (
  <View style={[styles.webFallback, { backgroundColor: theme.colors.background }]}>
    <Ionicons name="map" size={48} color={theme.colors.primary} />
    <Text style={[styles.webFallbackTitle, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]}>UTD Campus Map</Text>
    <Text style={[styles.webFallbackSub, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Search for a building below to get walking directions</Text>
  </View>
);

export const MapScreen: React.FC = () => {
  const { theme } = useTheme();
  const mapRef = useRef<any>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Building | null>(null);
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // Only request location on native platforms
    if (Platform.OS !== 'web' && Location) {
      (async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') { setLocationError('Location permission denied.'); return; }
          const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        } catch (error) {
          console.log('Location error:', error);
          setLocationError('Unable to get location.');
        }
      })();
    }
  }, []);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, [selected]);

  const panelTranslate = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [320, 0] });

  const filtered = UTD_BUILDINGS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.abbr && b.abbr.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = userLocation
    ? [...filtered].sort((a, b) =>
        haversineKm(userLocation.latitude, userLocation.longitude, a.lat, a.lng) -
        haversineKm(userLocation.latitude, userLocation.longitude, b.lat, b.lng)
      )
    : filtered;

  function selectBuilding(b: Building) {
    setSelected(b);
    setShowList(false);
    setSearch('');
    if (Platform.OS !== 'web') {
      mapRef.current?.animateToRegion(
        { latitude: b.lat, longitude: b.lng, latitudeDelta: 0.004, longitudeDelta: 0.004 },
        600
      );
    }
  }

  return (
    <View style={styles.root}>

      {/* ── MAP (mobile) or FALLBACK (web) ── */}
      {Platform.OS === 'web' ? (
        <WebMapFallback theme={theme} />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          initialRegion={{ ...UTD_CENTER, latitudeDelta: 0.014, longitudeDelta: 0.014 }}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass
        >
          {UTD_BUILDINGS.map((b) => (
            <Marker
              key={b.id}
              coordinate={{ latitude: b.lat, longitude: b.lng }}
              title={b.name}
              description={b.abbr ?? undefined}
              pinColor={selected?.id === b.id ? theme.colors.error : theme.colors.primary}
              onPress={() => selectBuilding(b)}
            />
          ))}
        </MapView>
      )}

      {/* ── SEARCH BAR ── */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchBox, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="search" size={18} color={theme.colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text, fontFamily: theme.fonts.regular }]}
            placeholder="Search UTD buildings…"
            placeholderTextColor={theme.colors.textSecondary}
            value={search}
            onChangeText={(t) => { setSearch(t); setShowList(true); }}
            onFocus={() => setShowList(true)}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => { setSearch(''); setShowList(false); }}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {showList && (
          <View style={[styles.dropdown, { backgroundColor: theme.colors.surface }]}>
            <FlatList
              data={sorted.slice(0, 30)}
              keyExtractor={(b) => b.id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const dist = userLocation
                  ? distLabel(haversineKm(userLocation.latitude, userLocation.longitude, item.lat, item.lng))
                  : null;
                return (
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => selectBuilding(item)}>
                    <Ionicons name="business" size={16} color={theme.colors.primary} style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.dropdownName, { color: theme.colors.text, fontFamily: theme.fonts.medium }]} numberOfLines={1}>{item.name}</Text>
                      {dist && <Text style={[styles.dropdownDist, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>{dist} away</Text>}
                    </View>
                    {item.abbr && <Text style={[styles.dropdownAbbr, { color: theme.colors.primary, fontFamily: theme.fonts.semiBold }]}>{item.abbr}</Text>}
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />}
            />
          </View>
        )}
      </View>

      {/* ── LOCATE ME (mobile only) ── */}
      {Platform.OS !== 'web' && (
        <TouchableOpacity
          style={[styles.locateBtn, { backgroundColor: theme.colors.surface }]}
          onPress={() => {
            if (!userLocation) {
              Alert.alert('Location unavailable', locationError ?? 'Cannot get location.');
              return;
            }
            mapRef.current?.animateToRegion(
              { ...userLocation, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 500
            );
          }}
        >
          <Ionicons name="locate" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
      )}

      {/* ── BACKDROP to close dropdown ── */}
      {showList && (
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={() => setShowList(false)}
          activeOpacity={1}
        />
      )}

      {/* ── SELECTED BUILDING PANEL ── */}
      {selected && (
        <Animated.View style={[styles.panel, { backgroundColor: theme.colors.surface, transform: [{ translateY: panelTranslate }] }]}>
          <View style={[styles.panelHandle, { backgroundColor: theme.colors.border }]} />
          <View style={styles.panelHeader}>
            <View style={[styles.abbrBadge, { backgroundColor: theme.colors.primary }, !selected.abbr && { backgroundColor: theme.colors.background }]}>
              {selected.abbr
                ? <Text style={[styles.abbrText, { fontFamily: theme.fonts.semiBold }]}>{selected.abbr}</Text>
                : <Ionicons name="business" size={16} color={theme.colors.textSecondary} />}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.panelName, { color: theme.colors.text, fontFamily: theme.fonts.semiBold }]} numberOfLines={2}>{selected.name}</Text>
              {userLocation && (
                <Text style={[styles.panelDist, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
                  {distLabel(haversineKm(userLocation.latitude, userLocation.longitude, selected.lat, selected.lng))} from you
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => setSelected(null)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={22} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.navBtn, { backgroundColor: theme.colors.primary }]} onPress={() => openNavigation(selected.lat, selected.lng)}>
            <Ionicons name="navigate" size={20} color={theme.colors.surface} style={{ marginRight: 8 }} />
            <Text style={[styles.navBtnText, { color: theme.colors.surface, fontFamily: theme.fonts.semiBold }]}>Navigate Here</Text>
          </TouchableOpacity>
          <Text style={[styles.navHint, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>Opens Google Maps / Apple Maps · walking directions</Text>
        </Animated.View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  map:  { flex: 1 },

  // Web fallback
  webFallback: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#E8F4EC', gap: 12,
  },
  webFallbackTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  webFallbackSub:   { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingHorizontal: 40 },

  // Search
  searchWrapper: { position: 'absolute', top: 16, left: 16, right: 16, zIndex: 20 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
  },
  searchInput:   { flex: 1, fontSize: 15, color: '#1F2937' },
  dropdown: {
    backgroundColor: '#FFF', borderRadius: 12, marginTop: 6,
    maxHeight: 300, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12, shadowRadius: 10, elevation: 8,
  },
  dropdownItem:  { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  dropdownName:  { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  dropdownDist:  { fontSize: 12, color: '#9CA3AF', marginTop: 1 },
  dropdownAbbr:  { fontSize: 12, fontWeight: '700', color: '#C75B12', marginLeft: 8 },
  separator:     { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 },

  // Locate button
  locateBtn: {
    position: 'absolute', bottom: 220, right: 16, zIndex: 10,
    backgroundColor: '#FFF', width: 46, height: 46, borderRadius: 23,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, shadowRadius: 6, elevation: 5,
  },

  // Bottom panel
  panel: {
    position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 15,
    backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 40,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 12,
  },
  panelHandle:  { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  panelHeader:  { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  abbrBadge: {
    backgroundColor: '#E8F4EC', borderRadius: 8, paddingHorizontal: 10,
    paddingVertical: 6, minWidth: 52, alignItems: 'center', justifyContent: 'center',
  },
  abbrText:    { fontSize: 13, fontWeight: '800', color: '#C75B12', letterSpacing: 0.5 },
  panelName:   { fontSize: 15, fontWeight: '600', color: '#1F2937' },
  panelDist:   { fontSize: 13, color: '#6B7280', marginTop: 3 },
  navBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#C75B12', borderRadius: 14, paddingVertical: 15,
  },
  navBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  navHint:    { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 10 },
});