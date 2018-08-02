from django.contrib.auth.models import User
from django.db import models
# Create your models here.
from pandas.core.config_init import max_cols


from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings




class UserData(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    contactInfo=models.CharField(max_length=128)
    location = models.CharField(max_length=128)
    userRating = models.FloatField(null=True)

"""
                    <label>
                        Type of Account:
                        <RadioGroup onChange={this.typeofaccount} horizontal>
                            <RadioButton className="btn btn-info" value="teacher">
                                Teacher
                            </RadioButton>
                            <RadioButton className="btn btn-info" value="Learner">
                                Learner
                            </RadioButton>
                        </RadioGroup>
                    </label>
"""


class TeachingRequest(models.Model):
    nameOfTalent=models.CharField(max_length=128)
    youTubeLink=models.CharField(max_length=512)
    category=models.CharField(max_length=128)
    location=models.CharField(max_length=128)
    description=models.CharField(max_length=1024)
    contactInfo=models.CharField(max_length=128)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True)


class LearningRequest(models.Model):
    nameOfTalent=models.CharField(max_length=128)
    category=models.CharField(max_length=128)
    location = models.CharField(max_length=128)
    contactInfo = models.CharField(max_length=128)
    description = models.CharField(max_length=1024)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timeStamp = models.DateTimeField(auto_now_add=True)






