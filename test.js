const model = require('./models/deepseek-r1-70b.js')

async function run () {
  const start = performance.now()
  const res = await model.getResponse(`
  !!! FORMAT ALL FINAL RESPONSES USING ONLY MARKDOWN AND LATEX !!! 
  !!! WRAP INLINE LATEX CODE IN '$', AND WRAP BLOCKS IN '$$' !!!
  \qs{Problem 4}{ Maximum Subsequence Sum. Recall the maximum subsequence sum (MSS) problem, for which we gave a $\Theta(n log n)$ divide-and-conquer
    algorithm. In this problem, you will develop a dynamic programming algorithm with running time $\Theta(n)$ to solve the problem.
    
    The input is an array A containing n numbers, and the goal is to find a starting index s and ending index t (where $s \le t$) so the following sum is as large as possible: $A[s] + A[s + 1] + . . . + A[t - 1] + A[t]$
    
    For example, in the array
    
    $A = \{31, -41, 59, 26, -53, 58, 97, -93, -23, 84\}$
    
    the maximum is achieved by summing the third through seventh elements, to get $59 + 26+ (-53) + 58+ 97 = 187$, so the optimal solution is $s = 3$ and $t = 7$. When all entries are positive, the entire array is the answer
    ($s = 1$ and $t = n$). In general, we will allow the case $s = t$ (a sequence of only one element) but not allow empty subsequences.
    
    Give a dynamic algorithm to find the value of a maximum subsequence sum. For this problem, you only need to return the value, not the maximum subsequence itself.
    
    \textbf{Hint} Define $OPT(j)$ to be the maximum sum of any subsequence that ends at index j.
    
    Derive a dynamic algorithm for MSS by following these steps:
    \begin{enumerate}
        \item Write a recurrence and base case for $OPT(j)$.
        \item Write pseudocode for a bottom-up dynamic programming algorithm that computes the values $OPT(j)$ for all j from 1 to n. Your algorithm should take $\Theta(n)$ time.
        \item Describe in one sentence how we can find the value of the optimal solution to the original MSS problem if we know the value $OPT(j)$ for all j.
    \end{enumerate}
    }
  `)
  const message = model.cleanResponse(res)
  console.log(message)
  console.log(`time taken: ${((performance.now() - start) / 1000).toFixed(1)}s`)
}

run()
