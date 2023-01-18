export class OpenUvData {
  result: {
    uv: number;
    uv_max: number;
    uv_time: string;
    ozone: number;
    safe_exposure_time: number;
  };

  constructor() {
    this.result = {
      uv: 0,
      uv_max: 0,
      uv_time: '',
      ozone: 0,
      safe_exposure_time: 0,
    };
  }
}
