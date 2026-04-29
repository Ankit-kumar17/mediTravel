export const categories = [
  { id: 1, name: 'Physician', color: '#E0F2FE' },
  { id: 2, name: 'Dentist', color: '#F0FDF4' },
  { id: 3, name: 'Surgery', color: '#FEF2F2' },
  { id: 4, name: 'Therapy', color: '#FFF7ED' },
  { id: 5, name: 'Cardiology', color: '#F5F3FF' },
  { id: 6, name: 'Orthopedics', color: '#ECFDF5' },
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Physician',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 124,
    price: '$120/visit',
    experience: '15+ Years',
    patients: '2000+',
    successRate: '98%',
    bio: 'Dr. Sarah Johnson is a highly experienced cardiologist specializing in non-invasive cardiac imaging and preventive cardiology. With over 15 years of international experience, she has treated patients across Europe and Asia.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=600',
    availability: ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dentist',
    location: 'Seoul, Korea',
    rating: 4.8,
    reviews: 89,
    price: '$80/visit',
    experience: '10+ Years',
    patients: '1500+',
    successRate: '99%',
    bio: 'Dr. Michael Chen is a leading aesthetic dentist in Seoul. He specializes in smile makeovers and minimally invasive dental procedures, helping international patients achieve their perfect smile.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    availability: ['11:00 AM', '2:00 PM', '4:00 PM']
  },
  {
    id: 3,
    name: 'Dr. Elena Rossi',
    specialty: 'Surgery',
    location: 'Rome, Italy',
    rating: 5.0,
    reviews: 215,
    price: '$300/visit',
    experience: '20+ Years',
    patients: '3000+',
    successRate: '97%',
    bio: 'Dr. Elena Rossi is a world-renowned surgeon specializing in reconstructive and plastic surgery. She leads a top-tier medical team in Rome, serving elite international clientele.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600',
    availability: ['10:00 AM', '12:30 PM', '3:00 PM']
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Physician',
    location: 'London, UK',
    rating: 4.7,
    reviews: 156,
    price: '$150/visit',
    experience: '12+ Years',
    patients: '1800+',
    successRate: '96%',
    bio: 'Dr. James Wilson is a general physician with a focus on holistic health and disease prevention. He is known for his patient-first approach and clear communication.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    availability: ['9:30 AM', '11:30 AM', '2:30 PM']
  }
];

export const mockAppointments = [
  {
    id: 101,
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: 'Oct 24, 2023',
    time: '10:30 AM',
    status: 'Upcoming',
    type: 'Checkup'
  },
  {
    id: 102,
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    date: 'Oct 28, 2023',
    time: '2:00 PM',
    status: 'Upcoming',
    type: 'Cleaning'
  }
];

export const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: 'Dr. Sarah Johnson',
    lastMessage: 'Your test results are looking great. Let\'s discuss them in our next session.',
    time: '2:34 PM',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 2,
    senderId: 2,
    senderName: 'Dr. Michael Chen',
    lastMessage: 'Don\'t forget to bring your previous dental records.',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100'
  }
];
