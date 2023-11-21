import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


type Region = "Africa" | "Americas" | "Asia" | "Europe" |"Oceania";


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})


export class ByRegionPageComponent {
  constructor(private countriesService:CountriesService){}


  public selectedRegion?:Region;
  public countries:Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ["Africa","Americas","Asia","Europe","Oceania"];

  searchByRegion(term: Region) {
    console.log(term);
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchRegion(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    })
  }
}
