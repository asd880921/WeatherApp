import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { WeatherData } from '../models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // 地區資料
  regions: string[] = [
    '臺北市','新北市','桃園市','臺中市','臺南市','高雄市',    // 6 直轄市
    '宜蘭縣','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣',
    '嘉義縣','屏東縣','花蓮縣','臺東縣','澎湖縣',             // 11 縣
    '基隆市','新竹市','嘉義市'                               // 3 市
  ];
  // 天氣因子
  factors: string[] = ['Wx', 'PoP', 'CI', 'MinT', 'MaxT'];

  // 儲存所有資料
  data: WeatherData[] = [];
  selectedRegion: string = '';
  selectedFactor: string = '';
  authorization: string = 'CWA-84F692D5-3A8B-4792-A8DD-02F6F1DFE504'; //氣象開放資料平台會員授權碼

  constructor(private weatherService: HomeService) { }

  onSubmit(): void {
    this.weatherService.getWeatherData(this.authorization, this.selectedRegion, this.selectedFactor)
    .subscribe(
      (response) => {
        this.setWeatherData(response);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private setWeatherData(response: any): any {
    const locationData = response['records']['location'];
    this.data = [];
    locationData.forEach(location => {
      location['weatherElement'].forEach(element => {
        if (element['elementName']) {
          element['time'].forEach(time => {
            this.data.push({
              locationName: location['locationName'],
              startTime: time['startTime'],
              endTime: time['endTime'],
              parameterName: time['parameter']['parameterName'],
              parameterValue: time['parameter']['parameterValue'],
              parameterUnit: time['parameter']['parameterUnit'] || ''
            });
          });
        }
      });
    });
  }
  
  private handleError(error: any): void {
    // 在此處理錯誤，例如顯示錯誤訊息
    alert('發生錯誤：' + (error.message || error));
  }
}
