/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleArticle } from '../../utils/data/articleData';

export default function ArticleDetailView() {
  const router = useRouter();
  const { articleId } = router.query;
  const [article, setArticle] = useState({});

  const getArticle = () => {
    getSingleArticle(articleId).then(setArticle);
  };

  useEffect(() => {
    getArticle();
  }, [router]);

  return (
    <>
      <Card sx={{ display: 'inline' }}>
        <Typography variant="h5">{article?.title}</Typography>
        <Typography component="h6" variant="subtitle">Date Posted: {article?.datePosted}</Typography>
        <div style={{ overflow: 'hidden' }}>
          <CardMedia
            className="articleDetailImage"
            component="img"
            sx={{
              width: 'auto',
              height: 200,
              float: 'left',
              marginRight: '20px',
              borderColor: 'text.primary',
              m: 1,
              border: 1,
              borderRadius: '16px',
              margin: 2,
            }}
            image={article?.image}
            alt={article?.title}
          />
          <Typography color="text.secondary" component="p">
            {article?.content}
          </Typography>
        </div>
      </Card>
    </>
  );
}
