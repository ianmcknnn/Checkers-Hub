class User < ApplicationRecord
  has_many :games, through: :user_game

  has_many :outgoing_challenges, class_name: 'UserGame', foreign_key: :player_1
  has_many :opponents, through: :outgoing_challenges

  has_many :incoming_challenges, class_name: 'UserGame', foreign_key: :player_2
  has_many :challengers, through: :incoming_challenges
end
