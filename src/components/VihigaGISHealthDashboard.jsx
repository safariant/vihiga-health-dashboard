import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, Activity, Users, TrendingUp, Filter, Eye } from 'lucide-react';

const VihigaGISHealthDashboard = () => {
  const [selectedSubcounty, setSelectedSubcounty] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [showAccessibilityLayer, setShowAccessibilityLayer] = useState(true);

  const healthFacilities = [
    { id: 1, name: 'Vihiga County Referral Hospital', subcounty: 'Vihiga', lat: -0.5850, lng: 34.7540, type: 'Public', beds: 150, staff: 85, caseload: 450 },
    { id: 2, name: 'Maseno Mission Hospital', subcounty: 'Luanda', lat: -0.6045, lng: 34.7210, type: 'Faith-based', beds: 80, staff: 45, caseload: 280 },
    { id: 3, name: 'Hamisi Health Centre', subcounty: 'Hamisi', lat: -0.4950, lng: 34.8120, type: 'Public', beds: 30, staff: 18, caseload: 120 },
    { id: 4, name: 'Mbale Medical Clinic', subcounty: 'Vihiga', lat: -0.5920, lng: 34.7650, type: 'Private', beds: 20, staff: 12, caseload: 95 },
    { id: 5, name: 'Sabatia Health Centre', subcounty: 'Sabatia', lat: -0.7120, lng: 34.8450, type: 'Public', beds: 25, staff: 15, caseload: 105 },
    { id: 6, name: 'Emuhaya Sub-County Hospital', subcounty: 'Emuhaya', lat: -0.3850, lng: 34.6920, type: 'Public', beds: 60, staff: 35, caseload: 210 },
    { id: 7, name: 'Luanda Health Centre', subcounty: 'Luanda', lat: -0.6250, lng: 34.6890, type: 'Public', beds: 20, staff: 12, caseload: 95 },
    { id: 8, name: 'Bugina Clinic', subcounty: 'Hamisi', lat: -0.5120, lng: 34.8650, type: 'Private', beds: 15, staff: 10, caseload: 75 },
    { id: 9, name: 'Ekwanda Health Centre', subcounty: 'Vihiga', lat: -0.5540, lng: 34.7890, type: 'Public', beds: 20, staff: 10, caseload: 80 },
    { id: 10, name: 'Buyangu Medical Centre', subcounty: 'Sabatia', lat: -0.7340, lng: 34.8120, type: 'Private', beds: 25, staff: 14, caseload: 110 },
    { id: 11, name: 'Enzaro Health Centre', subcounty: 'Emuhaya', lat: -0.4120, lng: 34.7340, type: 'Public', beds: 18, staff: 9, caseload: 70 },
    { id: 12, name: 'Givudimbuli Clinic', subcounty: 'Hamisi', lat: -0.4620, lng: 34.7950, type: 'Faith-based', beds: 15, staff: 8, caseload: 65 },
  ];

  const subcounties = [
    { name: 'Vihiga', population: 85000, area: 120, lat: -0.5750, lng: 34.7730 },
    { name: 'Hamisi', population: 102000, area: 145, lat: -0.4850, lng: 34.8350 },
    { name: 'Sabatia', population: 78000, area: 110, lat: -0.7230, lng: 34.8290 },
    { name: 'Luanda', population: 95000, area: 130, lat: -0.6150, lng: 34.7050 },
    { name: 'Emuhaya', population: 88000, area: 125, lat: -0.3980, lng: 34.7130 },
  ];

  const diseaseData = [
    { week: 'Week 1', Malaria: 145, Typhoid: 28, Diarrhea: 85, Respiratory: 92 },
    { week: 'Week 2', Malaria: 168, Typhoid: 35, Diarrhea: 92, Respiratory: 108 },
    { week: 'Week 3', Malaria: 142, Typhoid: 32, Diarrhea: 78, Respiratory: 95 },
    { week: 'Week 4', Malaria: 195, Typhoid: 42, Diarrhea: 110, Respiratory: 125 },
  ];

  const accessibilityData = [
    { location: 'Urban Centers', population: 185000, avgDistance: 2.5, accessibility: 95, color: '#10b981' },
    { location: 'Rural Areas', population: 263000, avgDistance: 7.2, accessibility: 68, color: '#f59e0b' },
    { location: 'Remote Areas', population: 42000, avgDistance: 12.4, accessibility: 35, color: '#ef4444' },
  ];

  const capacityData = [
    { subcounty: 'Vihiga', utilization: 78, capacity: 220, demand: 625 },
    { subcounty: 'Hamisi', utilization: 82, capacity: 260, demand: 615 },
    { subcounty: 'Sabatia', utilization: 75, capacity: 180, demand: 480 },
    { subcounty: 'Luanda', utilization: 71, capacity: 200, demand: 550 },
    { subcounty: 'Emuhaya', utilization: 68, capacity: 155, demand: 425 },
  ];

  const facilityTypeData = [
    { name: 'Public', value: 75, color: '#3b82f6' },
    { name: 'Private', value: 57, color: '#8b5cf6' },
    { name: 'Faith-based', value: 9, color: '#ec4899' },
    { name: 'NGO', value: 3, color: '#14b8a6' },
  ];

  const populationCoverageData = [
    { subcounty: 'Vihiga', ratio: 3970, facilities: 21 },
    { subcounty: 'Hamisi', ratio: 4075, facilities: 25 },
    { subcounty: 'Sabatia', ratio: 3120, facilities: 25 },
    { subcounty: 'Luanda', ratio: 4319, facilities: 22 },
    { subcounty: 'Emuhaya', ratio: 4190, facilities: 21 },
  ];

  const filteredFacilities = selectedSubcounty === 'All' 
    ? healthFacilities 
    : healthFacilities.filter(f => f.subcounty ===
