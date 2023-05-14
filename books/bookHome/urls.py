from django.urls import path
from . import views
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('book',views.getBooks.as_view(),name = 'homepageURL'),
    path('book/<int:id>',views.getBooksId.as_view(),name = 'getbooksById'),

]