import sys
import os
import django
print('Python %s on %s' % (sys.version, sys.platform))
sys.path.extend(['C:\\DjangoProject\\onlineproject', 'C:/DjangoProject/onlineproject'])
os.environ.setdefault("DJANGO_SETTINGS_MODULE","onlineproject.settings")
django.setup()
from LTApp.models import TeachingRequest
from django.contrib.auth.models import User
u=User.objects.get(id=1)
l=TeachingRequest.objects.create(nameOfTalent="nameOfTalent",youTubeLink="youTubeLink",user=u)
l.save()