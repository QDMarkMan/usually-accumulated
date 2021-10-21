

set =  { 1, 2, 3, 3, 3, 2 }
print(set)
set.add(5)

set.update([12,11])

print(set)

set.discard(5)

print(set)

if 1 in set:
  set.remove(1)
  
print(set)

set.pop()
print(set)