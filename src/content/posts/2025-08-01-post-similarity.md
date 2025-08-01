---
title: Detecting Similarity
tags: [meta, python]
---

This blog has been running for a long time now and have therefore built up quite a lot of posts covering many different subjects. I sometimes have an 
idea for a post - usually a conference talk I have found useful that I want to be able to find and point someone else to at a later date - but I usually 
don't check that I haven't already posted about it, say, 2 years before. Occasionally I catch myself in this double-posting but sometimes I manage to 
sneak through a post when my guard is down. This leads to the sometimes nagging doubt that, somewhere in the backlog of posts, there are identical, or 
almost identical posts about the same subject, perhaps with slightly different wording or different approach but essentially the same conent.

This lead me to work out a way of checking all the markdown source files that generate the posts and rate them according to how similar they are to one another. 
Once I have the list I can decide if I want to leave them (false positives), delete one (for identical post content just with different dates and possibly title),
or combine them (essentially the same but with some good points in each).

## Process 

1. Read the content of each markdown file.
1. Remove markdown syntax, punctuation, and stopwords to focus on the core content.
1. Convert the cleaned text into numerical vectors using Term Frequency-Inverse Document Frequency (TF-IDF) and cosine similarity.
1. Compute pairwise similarity scores (e.g., cosine similarity) between all files.
1. Flag pairs with similarity above a certain threshold as potential duplicates.
1. Generate a list of similar file pairs with similarity scores for review.

## Prerequisites

This script relies on a couple of python libraries to do a lot of the heavy lifting.

1. scikit-learn: TF-IDF vectorization and cosine similarity.
1. pandas: formatting and displaying the results in a readable table.

```shell

pip install scikit-learn pandas

```


## Code

Here is the complete script

```python
import os
import glob
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# Step 1: Load and clean markdown files
def load_markdown_files(directory):
    files = glob.glob(os.path.join(directory, "*.md"))
    contents = {}
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            text = f.read()
            # Remove markdown syntax
            text = re.sub(r'`*#>\-\[\!]', '', text)
            contents[file] = text
    return contents

# Step 2: Compute similarity matrix
def compute_similarity(docs):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(docs.values())
    similarity_matrix = cosine_similarity(tfidf_matrix)
    return similarity_matrix

# Step 3: Report similar files
def find_similar_files(files, similarity_matrix, threshold=0.8):
    similar_pairs = []
    file_list = list(files.keys())
    for i in range(len(file_list)):
        for j in range(i + 1, len(file_list)):
            score = similarity_matrix[i][j]
            if score >= threshold:
                similar_pairs.append((file_list[i], file_list[j], round(score, 3)))
    return similar_pairs

# Main function
def main(directory, threshold=0.8):
    files = load_markdown_files(directory)
    similarity_matrix = compute_similarity(files)
    similar_files = find_similar_files(files, similarity_matrix, threshold)
    
    if similar_files:
        df = pd.DataFrame(similar_files, columns=["File 1", "File 2", "Similarity"])
        print(df.to_string(index=False))
    else:
        print("No similar files found above the threshold.")

# Example usage
if __name__ == "__main__":
    directory_path = "./src/content/posts"
    main(directory_path, threshold=0.8)

```

## Result 

It worked and found 3 pairs of posts, one quotation, one video and a pair of posts about the same subject that I was able to combine by 
updating the original post. 

I found setting a threshold around 70% to 80% reliably found duplicates without introducing too many false positives.

