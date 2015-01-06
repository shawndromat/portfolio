class ProjectsController < ApplicationController
  def index
    @projects = Project.visible
  end
end
