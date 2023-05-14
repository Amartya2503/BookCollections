from django.db import models

# Create your models here.

class Book(models.Model):

    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    summary = models.CharField(max_length=250)
    date_published = models.DateField(auto_now_add= False)
    copies_sold = models.IntegerField()

    def __str__(self):
        return self.name+ " " +self.author
    