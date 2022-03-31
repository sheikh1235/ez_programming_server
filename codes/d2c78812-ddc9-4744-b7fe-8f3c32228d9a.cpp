#include<iostream>
#include <string>
//macro definitions
#define MAX_NAME_LEN 60

using namespace std;

int main()
{
  string a;
  cin >> a;
  string b;
  cin >> a;
  if (a.compare(b) == 0)
  {
    cout << "Both are same";
  }
}