'use client';
import { FormEvent, useEffect, useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import Fuse from 'fuse.js';
import { Loader } from '@/components/Loader';
import { Instructions } from '@/components/Instructions';
import { ErrorsType } from '@/types/ValidationType';
import { useValidation } from '@/hooks/useValidation';
import { PostType } from '@/types/PostType';
import React from 'react';
import { Results } from '@/components/Results';
import { consts } from '@/assets/consts';

export default function HomePage() {
  const [textValue, setTextValue] = useState(consts.initialInputValue);
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [customColorName, setCustomColorName] = useState<string>(consts.blue);
  const [showLoader, setShowLoader] = useState(true);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [posts, setPosts] = useState<PostType[]>([]);
  const [results, setResults] = useState<Fuse.FuseResult<PostType>[]>([]);

  const clickCheckbox = () => setCheckboxValue(!checkboxValue);
  const onChangeInput = (value: string) => {
    setTextValue(value);
    const options = {
      includeMatches: true,
      threshold: 0.2,
      keys: [consts.searchKey],
    };
    const fuse = new Fuse(posts, options);
    setResults(fuse.search(value));
  };
  const fetchPosts = async () => {
    const url = consts.getPostsUrl;
    try {
      const res = await fetch(url, { method: 'GET' });
      const response = await res.json();
      setPosts(response as PostType[]);
    } catch (e) {
      console.error(`[Error] GET ${url}`, e);
      throw e;
    } finally {
      setShowLoader(false);
    }
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(useValidation({ checkboxValue, textValue }));
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="p-2">
      <div className="flex flex-col gap-2 my-2 ml-1">
        <div>
          <code className="bg-cyan-400">{consts.colorLabel}</code> = "{customColorName}"
        </div>
        <div>
          <code className="bg-green-400">{consts.textLabel}</code> = "{textValue}"
        </div>
        <div>
          <code className="bg-purple-400">{consts.checkboxLabel}</code> = "{checkboxValue.toString()}"
        </div>
      </div>
      <div className="flex gap-3 my-3 items-center justify-center">
        <button onClick={() => setCustomColorName(consts.green)} className="bg-slate-300 rounded-md p-1.5">
          {consts.greenTheme}
        </button>
        <button onClick={() => setCustomColorName(consts.blue)} className="bg-slate-300 rounded-md p-1.5">
          {consts.blueTheme}
        </button>
        <button onClick={() => setTextValue('new value')} className="bg-slate-300 rounded-md p-1.5">
          {consts.setInput}
        </button>
        {/* This button should toggle checkbox state */}
        <button className="bg-slate-300 rounded-md p-1.5" onClick={clickCheckbox}>
          {consts.toggleCheckbox}
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-5 mb-3 justify-center">
          <Checkbox color={customColorName} onChange={clickCheckbox} checked={checkboxValue}>
            {consts.checkboxText}
          </Checkbox>
          <Input value={textValue} onChange={onChangeInput} color={customColorName} />
          <p className="inline-flex items-center mx-auto w-64 bg-red-500">{errors.checkboxError}</p>
          <p className="inline-flex items-center mx-auto w-90 bg-red-500">{errors.inputError}</p>
          <div className="flex justify-center gap-2">
            <button className="bg-slate-300 rounded-md p-1.5" type="submit">
              {consts.submitText}
            </button>
            {showLoader && <Loader />}
          </div>
          <div className="font-bold text-center">{consts.resultsTitle}</div>
          <div className="text-left">
            <Results results={results} />
          </div>
        </div>
      </form>
      <Instructions />
    </div>
  );
}
