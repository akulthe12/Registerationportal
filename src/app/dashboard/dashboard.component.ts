import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  entriesCount: number = 0;
  genderRatio = { male: 0, female: 0, other: 0 };
  ageGroups = { '18-30': 0, '30-60': 0, '60+': 0 };
  countryData: any[] = [];
  cityData: any[] = [];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.api.getRegistrationDetails().subscribe((data:any) => {
      console.log('Fetched data:', data);
      
      this.entriesCount = data.length;
      this.genderRatio = this.calculateGenderRatio(data);
      this.ageGroups = this.calculateAgeGroups(data);
      this.countryData = this.calculateCountryData(data);
      this.cityData = this.calculateCityData(data);
    });
  }

  calculateGenderRatio(data: any[]): { male: number, female: number, other: number } {
    const genderRatio = { male: 0, female: 0, other: 0 };
    data.forEach((entry: any) => {
      if (entry.gender === 'male') genderRatio.male++;
      if (entry.gender === 'female') genderRatio.female++;
      if (entry.gender === 'other') genderRatio.other++;
    });
    console.log('Gender ratio:', genderRatio);
    return genderRatio;
  }

  calculateAgeGroups(data: any[]): { '18-30': number, '30-60': number, '60+': number, '0': number } {
    const ageGroups = { '18-30': 0, '30-60': 0, '60+': 0, '0': 0 };
  
    data.forEach((entry: any) => {
      const age = entry.age;
      if (age === 0) {
        ageGroups['0']++;
      } else if (age >= 18 && age <= 30) {
        ageGroups['18-30']++;
      } else if (age > 30 && age <= 60) {
        ageGroups['30-60']++;
      } else if (age > 60) {
        ageGroups['60+']++;
      }
    });
  
    console.log('Age groups:', ageGroups);
    return ageGroups;
  }
  
  
  



  
  calculateCountryData(data: any[]): any[] {
    const countryData: { [key: string]: number } = {};
    data.forEach((entry: any) => {
      const country = entry.country;
      if (!countryData[country]) countryData[country] = 0;
      countryData[country]++;
    });
    const result = Object.keys(countryData).map(key => ({ name: key, count: countryData[key] }));
    console.log('Country data:', result);
    return result;
  }

  calculateCityData(data: any[]): any[] {
    const cityData: { [key: string]: number } = {};
    data.forEach((entry: any) => {
      const city = entry.city;
      if (!cityData[city]) cityData[city] = 0;
      cityData[city]++;
    });
    const result = Object.keys(cityData).map(key => ({ name: key, count: cityData[key] }));
    console.log('City data:', result);
    return result;
  }
}