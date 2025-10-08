async function addUser() {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'pass456',
          phoneNumber: '0987654321',
          address: '456 Oak Ave',
        }),
      });
      const data = await response.json();
      console.log('POST User Response:', data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
  
  async function getUsers() {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      console.log('GET Users Response:', data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  async function addLocation() {
    try {
      const response = await fetch('http://localhost:5000/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Downtown Library',
          address: '123 Library St, City',
          coordinates: { lat: 40.7128, lng: -74.0060 },
        }),
      });
      const data = await response.json();
      console.log('POST Location Response:', data);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  }
  
  async function getLocations() {
    try {
      const response = await fetch('http://localhost:5000/api/locations');
      const data = await response.json();
      console.log('GET Locations Response:', data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
  
  async function main() {
    await addUser();
    await getUsers();
    await addLocation();
    await getLocations();
  }
  
  main();