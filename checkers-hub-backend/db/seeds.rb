# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Game.destroy_all
15.times {User.create(name: Faker::DcComics.unique.hero,
    location: Faker::Games::Zelda.location,
    bio: Faker::TvShows::Simpsons.quote,
    favorite_game: "Checkers",
    image:'https://www.lego.com/cdn/cs/set/assets/blt167d8e20620e4817/DC_-_Character_-_Details_-_Sidekick-Standard_-_Batman.jpg?fit=crop&width=800&height=426&quality=80')}

User.create(name: 'Ian', 
            location: 'Baltimore, MD', 
            bio: Faker::TvShows::Simpsons.quote,
            favorite_game: 'Checkers',
            image: 'https://i.imgur.com/CWfGjgG.jpg')

User.create(name: 'Diego',
            location: 'Ashburn, VA',
            bio: Faker::TvShows::Simpsons.quote,
            favorite_game: 'Checkers',
            image: 'https://i.imgur.com/4mpfo3V.jpg')
            
Game.create(name: "Checkers",
description: "Is a group of strategy board games for two players which involve diagonal moves of uniform game pieces and mandatory captures by jumping over opponent pieces.")

10.times {
    UserGame.create(
        user: User.all.sample
        game: Game.find_by(name: 'Checkers')
    )
}
