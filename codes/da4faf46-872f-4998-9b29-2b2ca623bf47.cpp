#include<iostream>
#include <string>
//macro definitions
#define MAX_NAME_LEN 60

using namespace std;

int main()
{
  string a;
  cin.getline (a, MAX_NAME_LEN);
  string sub;
  cin >> sub;
  cout << a << "-" << sub;
}