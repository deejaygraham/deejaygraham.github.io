class Flock(object):

    def __init__(self):
        self.members = list()

    def fly(self, width, height):
        for member in self.members:
            member.fly(self.members, width, height)

    def add(self, newMember):
        self.members.append(newMember)
