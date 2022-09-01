import CinemaModel from "../models/cinema-model"
import MovieModel from "../models/movie-model"

export const cinemas: CinemaModel[] = [
    {
        "cinemaId": 1,
        "cinemaName": "Cinema City"
    },
    {
        "cinemaId": 2,
        "cinemaName": "Yes Planet"
    },
    {
        "cinemaId": 3,
        "cinemaName": "Lev Ciname"
    }
]

export const movies: MovieModel[] = [
        {
            "movieId": 1,
            "cinemaId": 1,
            "movieName":"Spiderman",
            "movieTime": "2022-03-24 17:00:00",
            "duration": 90
        },
        {
            "movieId": 7,
            "cinemaId": 1,
            "movieName": "Batman",
            "movieTime": "2022-03-15 21:51:07",
            "duration": 100
        },
        {
            "movieId": 8,
            "cinemaId": 1,
            "movieName": "Superman",
            "movieTime": "2022-03-16 21:51:07",
            "duration": 95
        },
        {
            "movieId": 9,
            "cinemaId": 2,
            "movieName": "Wonder Woman",
            "movieTime": "2022-03-16 21:51:39",
            "duration": 120
        },
        {
            "movieId": 10,
            "cinemaId": 2,
            "movieName": "Iron Man",
            "movieTime": "2022-03-23 21:52:00",
            "duration": 105
        },
        {
            "movieId": 11,
            "cinemaId": 3,
            "movieName": "Love is in the air",
            "movieTime": "2022-03-24 21:52:56",
            "duration": 60
        }
    ]