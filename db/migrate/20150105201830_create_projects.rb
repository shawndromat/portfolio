class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :live_url
      t.string :github_url
      t.text :description
      t.string :image_path

      t.timestamps
    end
  end
end
