class CinemaModel {
  public cinemaId: number; // PK
  public cinemaName: string;

  public constructor(cinema: CinemaModel) {
    this.cinemaId = cinema.cinemaId;
    this.cinemaName = cinema.cinemaName;
  }
}

export default CinemaModel;
