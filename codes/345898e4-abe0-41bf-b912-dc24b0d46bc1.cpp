#include<iostream>
#include <string>
//macro definitions
#define MAX_NAME_LEN 60

using namespace std;

int main()
{
  string a;
  
  cin>>a;
  int n = a.length();
 
    // declaring character array
    char char_array[n + 1];
 
    // copying the contents of the
    // string to char array
    strcpy(char_array, a.c_str());
 
  string sub;
  cin >> sub;
  cout << a << "-" << char_array;
}