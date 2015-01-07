class Project < ActiveRecord::Base
  default_scope { where(visible: true).order(:rank) }

  def github=(path)
    self.github_url = "http://www.github.com/shawndromat/#{path}"
  end

  def short_name
    self.name.downcase.gsub(' ', '-')
  end
end
