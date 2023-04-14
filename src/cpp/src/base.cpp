/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Date [2023-02-21 16:55:46].
 *  @Des [test].
 *-------------------------------------------------------------------------------------------- */
#include <string>
#include <iostream>

using namespace std;

void test () {
  std::string username;
  cout << "Please enter name";
  cin >> username;
  cout << "You name is ";
  cout << username;
};

int main() {
  test();
  return 0;
};
