#include<iostream>
#include <string>
#include <cmath>

using namespace std;

int main()
{
  int ae = sqrt(29);
  cout << ae << endl;
  string a;
  cin >> a;
  string b;
  cin >> b;
  b[1] = 'z';
  if (a.compare(b) > 0)
  {
    cout << "First input is greater";
  }
  if (a.compare(b) == 0)
  {
    cout << "Both inputs are same";
  }
  
}