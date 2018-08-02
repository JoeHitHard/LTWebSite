from django.urls import path
from LTApp.views import LoginSignup,TeachersRequestViews,LearningRequestViews


urlpatterns=[
    path(r'api-token-auth/',LoginSignup.LogIn.as_view()),
    path(r'signup/',LoginSignup.SignUp.as_view()),
    path(r'createteacherRequest/',TeachersRequestViews.CreateTeachersRequestView.as_view()),
    path(r'createlearningRequest/', LearningRequestViews.CreateLearningRequestView.as_view()),
    path(r'getTeachingRequests/', TeachersRequestViews.GetTeachersRequestView.as_view()),
    path(r'getLearningRequests/', LearningRequestViews.GetLearningRequestView.as_view()),
    path(r'editTeachingRequest/',TeachersRequestViews.EditTeachersRequestView.as_view()),
    path(r'editLearningRequest/',LearningRequestViews.EditLearningRequestView.as_view()),
    path(r'getUserTeachingRequest/', TeachersRequestViews.GetUserTeachersRequestView.as_view()),
    path(r'getUserLearningRequest/', LearningRequestViews.GetUserLearningRequestView.as_view()),

]