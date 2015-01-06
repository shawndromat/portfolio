class Project < ActiveRecord::Base
  def self.visible
    self.all.where(visible: true)
  end

  def github=(path)
    self.github_url = "http://www.github.com/shawndromat/#{path}"
  end

  def short_name
    self.name.downcase.gsub(' ', '-')
  end
end
