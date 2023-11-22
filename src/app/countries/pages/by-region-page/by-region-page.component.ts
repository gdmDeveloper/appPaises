import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})




export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) { }
  ngOnInit(): void {
    this.countries =  this.countriesService.cacheStore.byRegion.countries;
    this.countries = this.countriesService.sortCountries(this.countries);
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }


  public selectedRegion?: Region;
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  public initialValue?: Region = "";

  searchByRegion(term: Region) {
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchRegion(term).subscribe(countries => {
      this.countries = countries;
      this.countries = this.countriesService.sortCountries(this.countries);
      this.isLoading = false;
    })
  }
}


