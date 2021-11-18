/******************************************************************************

Welcome to C plus plus.

*******************************************************************************/
#include <stdio.h>

namespace Diy {
    class Student {
        public:
            char *name;
            int age;
            float score;
            
        public:
            void say () {
                printf("%s age is %d, score is %f\n", name, age, score);
            };
    };
};

int main()
{
    printf("Hello World");
    
    Diy::Student stu1;
    
    stu1.name = (char*)"ming";
    stu1.age = 15;
    stu1.score = 99.9f;
    stu1.say();
    
    return 0;
};

