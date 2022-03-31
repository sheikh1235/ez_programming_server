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
  cin >> b;
  if (a.compare(b) > 0)
  {
    cout << "First input is greater";
  }
  if (a.compare(b) == 0)
  {
    cout << "Both inputs are same";
  }
  else{
   	cout << "First input is greater"; 
  }
  
}