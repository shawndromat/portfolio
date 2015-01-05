class Project < ActiveRecord::Base
  def self.visible
    self.all.where(visible: true)
  end
end
