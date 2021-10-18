# from typing import _promote
# from rdkit import Chem

# m = Chem.MolFromSmiles('Cc1ccccc1')

# print(m)

dict = {}.fromkeys(['dict', 'c'])

print(dict, dict.get('dict'))

dict.setdefault('b', 'b')
dict.update({'x':1})

# del dict['x']
# dict.pop('x')
print(dict.popitem())
# dict.clear()
# del dict

dict2 = dict.copy()

for k, v in dict.items():
  print(f"key is {k}, and value is {v}")

for k in dict.keys():
  print(f"key is {k}")

for k in dict:
  print(f"key is {k}") 

for value in dict.values():
   print(f"value is {value}")

for value in set(dict.values()):
   print(f"set value is {value}")  

print(dict, dict2)