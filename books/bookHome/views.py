from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.http import HttpResponse
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from .serializers import BookSerializer
from .models import Book
# Create your views here.

class getBooks(GenericAPIView):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    def get(self,request):
        books = Book.objects.all()
        serializer = BookSerializer(books,many = True)
        return Response(data = serializer.data,status=status.HTTP_200_OK)
    def post(self,request):

        serializer = BookSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data= serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response("nope")
    
class getBooksId(GenericAPIView):
    serializer_class = BookSerializer

    def get(self,request,id):
        try:
            instance = Book.objects.get(id = id)
            serializer = BookSerializer(instance)
            return Response(data= serializer.data)
        except ObjectDoesNotExist:
            return Response("the book with this id does not exist",status = status.HTTP_404_NOT_FOUND)
    
    def delete(self,request,id):
        book = Book.objects.get(id = id)
        book.delete()
        return Response(status=status.HTTP_200_OK,data ={'message': 'Deleted the book'})
    
    def patch(self,request,id):
        book = Book.objects.get(id = id)
        serializer = BookSerializer(book,request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_202_ACCEPTED, data = serializer.data)
        else:
            return Response(data = {"message": "wrong "})

