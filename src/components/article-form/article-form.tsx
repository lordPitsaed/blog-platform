import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import blogPlatformService from '../../blog-platform-service';
import classes from './article-form.module.scss';

interface FormInputs {
  title: string;
  description: string;
  text: string;
  tag: string;
}

const ArticleForm: React.FC<{ mode: 'create' | 'edit' }> = ({ mode }) => {
  const { slug } = useParams();
  const article = useSelector((state: RootState) => {
    if (mode === 'edit') {
      return state.articlePageSlice.article;
    }
  });
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormInputs>({ mode: 'onChange' });

  const token = useSelector((state: RootState) => {
    if (state.loginSlice.userLogged && state.loginSlice.status === 'success') {
      return state.loginSlice.user.user.token;
    }
  });

  const [tags, setTags] = useState(['']);

  const addTag = () => {
    setTags([...tags, '']);
  };

  const deleteTag = (key: number) => {
    setTags([...tags.slice(0, key), ...tags.slice(key + 1)]);
  };

  const onSubmit = (data: FormInputs) => {
    const article = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tags.filter((tag) => tag.length > 0),
      },
    };
    if (token) {
      if (mode === 'create') {
        blogPlatformService.postArticle(token, article).then(({ article }) => {
          navigate(`/articles/${article.slug}`);
        });
      }
      if (mode === 'edit' && slug) {
        blogPlatformService.postEditedArticle(token, slug, article).then(({ article }) => {
          navigate(`/articles/${article.slug}`);
        });
      }
    }
  };
  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        text: article.body,
      });
      setTags(article.tagList);
    }
  }, [article]);

  return (
    <div className={classes.formWrapper}>
      <div className={classes.header}>{mode[0].toUpperCase() + mode.slice(1)} new article</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.title}>
          <span>Title</span>
          <input
            className={errors.title && classes.borderError}
            type='text'
            placeholder='Title'
            {...register('title', { required: { value: true, message: 'Title is required' } })}
          />
          {errors.title && <span className={classes.error}>{errors.title.message}</span>}
        </label>
        <label className={classes.description}>
          <span>Short description</span>
          <input
            className={errors.description && classes.borderError}
            type='text'
            placeholder='Short description'
            {...register('description', { required: { value: true, message: 'Title is required' } })}
          />
          {errors.description && <span className={classes.error}>{errors.description.message}</span>}
        </label>
        <label className={classes.text}>
          <span>Text</span>
          <textarea
            className={errors.title && classes.borderError}
            placeholder='Text'
            {...register('text', { required: { value: true, message: 'Title is required' } })}
          />
          {errors.text && <span className={classes.error}>{errors.text.message}</span>}
        </label>
        <div>
          <span>Tags</span>
          <div className={classes.tags}>
            {tags.map((tag, key) => {
              return (
                <div className={classes.tag} key={key}>
                  <input
                    className={errors.tag && classes.borderError}
                    style={{ width: 300 }}
                    type='text'
                    placeholder={`Tag`}
                    value={tag}
                    onChange={({ target }) => setTags([...tags.slice(0, key), target.value, ...tags.slice(key + 1)])}
                  />
                  <button type='button' onClick={() => deleteTag(key)} className={classes.deleteTag}>
                    Delete
                  </button>
                  {key === tags.length - 1 && (
                    <button type='button' className={classes.addTagButton} onClick={addTag}>
                      Add Tag
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {errors.tag && <span className={classes.error}>{errors.tag.message}</span>}
        </div>
        <input className={classes.submitButton} disabled={!isValid} type='submit' value='Send' />
      </form>
    </div>
  );
};

export default ArticleForm;
