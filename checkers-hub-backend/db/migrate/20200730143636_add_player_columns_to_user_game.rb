class AddPlayerColumnsToUserGame < ActiveRecord::Migration[6.0]
  def change
    add_column :user_game, :player_1_id, :integer
    add_column :user_game, :player_2_id, :integer
  end
end
