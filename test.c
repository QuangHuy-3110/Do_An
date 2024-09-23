#include <stdio.h>

typedef struct {
    int tu;
    int den;
    int g;
    int h;
    int f;
    int check;
}Node;

void find_open (Node L[], int *n, Node matrix[], int m, int start){
    int j = 0;
    for (int i = 0; i < m; i++)
    {
        if ((matrix[i].tu == start) && matrix[i].check == 0)
        {
            L[j] = matrix[i];
            j++;
        }        
    }
    *n = j;
    
}

Node find_node_min (Node L[], int n){
    Node A = L[0];
    for (int i = 0; i < n; i++)
    {
        if (L[i].f <= A.f)
        {
            A = L[i];
        }
        
    }
    return A;
}

void print (Node A, Node L[], int n){
    printf("------------------------------------------------------------\n");
    printf("|      X     |       OPEN        |          CLOSE          |\n");
    printf("------------------------------------------------------------\n");
    printf("|    (%d)     ", A.tu);
    for (int i = 0; i < n; i++)
    {
        if (i==n-2 || i!= 0)
        {
            printf("|           ");
            printf("|(%d, %d, %d, %d, %d) ", L[i].tu, L[i].g, L[i].h, L[i].f, L[i].den);
            printf("             \n");
        }
        else{
            
            printf("|(%d, %d, %d, %d, %d)", L[i].tu, L[i].g, L[i].h, L[i].f, L[i].den);
        }
            
    }
    printf("|(%d) |\n",A.tu);
    printf("------------------------------------------------------------\n");
}

void leo_doi (Node matrix[], int n, int start, int end){
    int m = 0;
    Node L[100];
    if (start == end)
    {
        printf("------------------------------------------------------------\n");
        printf("|      X     |       OPEN        |          CLOSE          |\n");
        printf("------------------------------------------------------------\n");
        printf("|  (%d)      | (%d, 0, 0, 0, %d) |           (%d)          |\n",start, start, end, start);
        printf("------------------------------------------------------------\n");
    }
    else {
        find_open(L, &m, matrix, n, start);
        Node A = find_node_min(L, m);
        A.check = 1;
        while (( A.den != end) && m != 0)
        {
            print(A, L, m);
            find_open(L, &m, matrix, n, A.den);
            for (int i = 0; i < m; i++)
            {
                L[i].g = L[i].g + A.g;
                L[i].f = L[i].g + L[i].h;
            }
            A = find_node_min(L, m);
            A.check = 1;            
        }
        print(A, L, m);
    }
    
}

int main (){
    Node matrix [100];
    int n = 4;
    matrix[0].tu = 1;
    matrix[0].h = 4;
    matrix[0].g = 4;
    matrix[0].f = 8;
    matrix[0].den = 2;
    matrix[0].check = 0;

    matrix[1].tu = 1;
    matrix[1].h = 2;
    matrix[1].g = 3;
    matrix[1].f = 5;
    matrix[1].den = 3;
    matrix[1].check = 0;

    matrix[2].tu = 2;
    matrix[2].h = 1;
    matrix[2].g = 2;
    matrix[2].f = 3;
    matrix[2].den = 3;
    matrix[2].check = 0;

    matrix[3].tu = 3;
    matrix[3].h = 0;
    matrix[3].g = 1;
    matrix[3].f = 1;
    matrix[3].den = 4;
    matrix[3].check = 0;
    leo_doi(matrix, n, 1, 4);
    return 0;
}