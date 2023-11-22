import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

constructor(private countriesService:CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.countries = this.countriesService.sortCountries(this.countries);
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

public countries:Country[] = [];
public isLoading: boolean = false;
public initialValue:string = "";

searchByCountry(term:string) {
  this.isLoading = true;
  this.countriesService.searchCountry(term).subscribe(countries =>{
    this.countries = countries;
    this.countries = this.countriesService.sortCountries(this.countries);
    this.isLoading = false;
  })
}


}
