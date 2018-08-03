from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from LTApp.models import *
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, TokenAuthentication


class CreateTeachersRequestView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            userid = request.data["user"]
            tokenkey = request.data["token"]
            user = User.objects.get(username=userid)
            token =Token.objects.get(key=tokenkey)
            if user and token:
                if user.id == token.user_id:
                    nameOfTalent = request.data["nameOfTalent"]
                    youTubeLink = request.data["youTubeLink"]
                    category = request.data["category"]
                    location = request.data["location"]
                    description= request.data["talentDescription"]
                    userData = UserData.objects.get(user=user)
                    tr = TeachingRequest.objects.create(nameOfTalent=nameOfTalent, youTubeLink=youTubeLink, category=category, location=location, user=user,contactInfo=userData.contactInfo,description=description)
                    tr.save()
                    context = {
                        "created": True,
                    }
                    return Response(context, status=300)
                else:
                    context = {
                        "created": False,
                        "error": "Invalid token...",
                    }
                    return Response(context, status=300)
            else:
                context = {
                    "created": False,
                    "error": "Please Login...",
                }
                return Response(context, status=300)
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            error = template.format(type(ex).__name__, ex.args)
            context = {
                "created": False,
                "error": error,
            }
            return Response(context, status=300)



class GetTeachersRequestView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            userid = request.data["user"]
            tokenkey = request.data["token"]
            user = User.objects.get(username=userid)
            token =Token.objects.get(key=tokenkey)
            if user and token:
                if user.id == token.user_id:
                    sort=request.data["sort"]
                    offset = request.data["offset"]
                    data=TeachingRequest.objects.all().order_by(sort)[int(offset):int(offset)+10]
                    ldata=[]
                    for i in data:
                        d={}
                        d["id"]=i.id
                        d["name"]=i.nameOfTalent
                        d["youtubelink"]=i.youTubeLink
                        d["username"]=i.user.username
                        d["contactinfo"]=i.contactInfo
                        d["description"]=i.description
                        d["category"]=i.category
                        d["locationOfTeaching"]=i.location
                        ldata.append(d)
                    context={
                        "got":True,
                        "listObjects":ldata,
                    }
                    return Response(context, status=300)
                else:
                    context = {
                        "got": False,
                        "error": "Invalid token...",
                    }
                    return Response(context, status=300)
            else:
                context = {
                    "got": False,
                    "error": "Please Login...",
                }
                return Response(context, status=300)
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            error = template.format(type(ex).__name__, ex.args)
            context = {
                "got": False,
                "error": error,
            }
            return Response(context, status=300)


class GetUserTeachersRequestView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            userid = request.data["user"]
            tokenkey = request.data["token"]
            user = User.objects.get(username=userid)
            token =Token.objects.get(key=tokenkey)
            if user and token:
                if user.id == token.user_id:
                    sort=request.data["sort"]
                    offset = request.data["offset"]
                    data=TeachingRequest.objects.filter(user=user).order_by(sort)[int(offset):int(offset)+10]
                    ldata=[]
                    for i in data:
                        d={}
                        d["id"]=i.id
                        d["name"]=i.nameOfTalent
                        d["youtubelink"]=i.youTubeLink
                        d["username"]=i.user.username
                        d["contactinfo"]=i.contactInfo
                        d["description"]=i.description
                        d["category"]=i.category
                        d["locationOfTeaching"]=i.location
                        ldata.append(d)
                    context={
                        "got":True,
                        "listObjects":ldata,
                    }
                    return Response(context, status=300)
                else:
                    context = {
                        "got": False,
                        "error": "Invalid token...",
                    }
                    return Response(context, status=300)
            else:
                context = {
                    "got": False,
                    "error": "Please Login...",
                }
                return Response(context, status=300)
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            error = template.format(type(ex).__name__, ex.args)
            context = {
                "got": False,
                "error": error,
            }
            return Response(context, status=300)




class EditTeachersRequestView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            userid = request.data["user"]
            tokenkey = request.data["token"]
            user = User.objects.get(username=userid)
            token =Token.objects.get(key=tokenkey)
            if user and token:
                if user.id == token.user_id:
                    nameOfTalent = request.data["nameOfTalent"]
                    youTubeLink = request.data["youTubeLink"]
                    category = request.data["category"]
                    location = request.data["location"]
                    description= request.data["talentDescription"]
                    id=int(request.data["requestid"])
                    # import ipdb
                    # ipdb.set_trace()
                    tr=TeachingRequest.objects.get(id=id)
                    if(tr):
                        if(tr.user.id==user.id):
                            tr.nameOfTalent=nameOfTalent
                            tr.youTubeLink =youTubeLink
                            tr.category =category
                            tr.location =location
                            tr.description =description
                            tr.save()
                            context = {
                                "edit": True,
                            }
                            return Response(context, status=300)
                        else:
                            context = {
                                "edit": False,
                                "error": "Invalid User..."
                            }
                            return Response(context, status=300)
                    else:
                        context = {
                            "edit": False,
                            "error": "Invalid Request id..."
                        }
                        return Response(context, status=300)
                else:
                    context = {
                        "edit": False,
                        "error": "Invalid token...",
                    }
                    return Response(context, status=300)
            else:
                context = {
                    "edit": False,
                    "error": "Please Login...",
                }
                return Response(context, status=300)
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            error = template.format(type(ex).__name__, ex.args)
            context = {
                "edit": False,
                "error": error,
            }
            return Response(context, status=300)


class DeleteTeachersRequestView(APIView):
    authentication_classes = (BasicAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            userid = request.data["user"]
            tokenkey = request.data["token"]
            user = User.objects.get(username=userid)
            token =Token.objects.get(key=tokenkey)
            if user and token:
                if user.id == token.user_id:

                    id=int(request.data["requestid"])
                    # import ipdb
                    # ipdb.set_trace()
                    tr=TeachingRequest.objects.get(id=id)
                    if(tr):
                        if(tr.user.id==user.id):
                            tr.delete()
                            context = {
                                "delete": True,
                            }
                            return Response(context, status=300)
                        else:
                            context = {
                                "delete": False,
                                "error": "Invalid User..."
                            }
                            return Response(context, status=300)
                    else:
                        context = {
                            "delete": False,
                            "error": "Invalid Request id..."
                        }
                        return Response(context, status=300)
                else:
                    context = {
                        "delete": False,
                        "error": "Invalid token...",
                    }
                    return Response(context, status=300)
            else:
                context = {
                    "delete": False,
                    "error": "Please Login...",
                }
                return Response(context, status=300)
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            error = template.format(type(ex).__name__, ex.args)
            context = {
                "delete": False,
                "error": error,
            }
            return Response(context, status=300)
