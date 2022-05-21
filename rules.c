#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

char buffer;
int header = 1;
int phase = 0;
int charger = 0;

char str[25];

void main() {
  scanf("%s", str);
  while((buffer = getchar()) != EOF){


    if (phase == 0 && header == 1){
      printf("<h4>");
      header = 2;
      printf("%s", str);
    }
    if (header == 2 && buffer == '\n'){
      printf("</h4>");
      header = 0;
    }
    
    if (buffer == '\n' && charger == 0 && phase == 1){
      printf("</li>");
    }
    if ((charger == 1 || charger == 2) && phase == 1 && buffer != '\n'){
      printf(" <li>");
    }
    
    if (buffer == '\n'){
      charger++;
      if (charger == 2){
        phase++;
        if (phase == 1){
          printf("<ul>");
        } else {
          printf("</ul>\n");
         printf("\n<canvas id='%s1' style='height: 0px; width: 0px;'></canvas>\n<canvas id='%s2' style='height: 0px; width: 0px;'></canvas>\n", str, str);
          phase = 0;
          header = 1;
            scanf("%s", str);
            charger = 0;
        }
      }
    } else {
      charger = 0;
    }
    
    printf("%c", buffer);
  }
}
