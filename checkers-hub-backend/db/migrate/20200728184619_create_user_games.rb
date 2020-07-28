class CreateUserGames < ActiveRecord::Migration[6.0]
  def change
    create_table :user_games do |t|
      t.references :game, null: false, foreign_key: true
      t.string :moves

      t.timestamps
    end
  end
end
