import React, {Fragment} from 'react';
import {PlatformIcon} from 'platformicons';

import {SmartLink} from './smartLink';
import { serverContext } from 'sentry-docs/serverContext';
import { getCurrentPlatform, getPlatform } from 'sentry-docs/docTree';

type Props = {
  className?: string;
  platform?: string;
};

export function GuideGrid({platform, className}: Props) {
  const { rootNode, path } = serverContext();
  if (!rootNode) {
    return null;
  }

  const currentPlatform = platform ? getPlatform(rootNode, platform) : getCurrentPlatform(rootNode, path);
  if (!currentPlatform) {
    return null;
  }

  if (currentPlatform.guides.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <div className="doc-toc-title">
        <h6>Related Guides</h6>
      </div>
      <ul className={className}>
        {currentPlatform.guides.map(guide => (
          <li key={guide.key}>
            <SmartLink to={guide.url}>
              <PlatformIcon
                platform={guide.icon ?? guide.key}
                style={{marginRight: '0.5rem', border: 0, boxShadow: 'none'}}
                format="sm"
              />
              <h4 style={{display: 'inline-block'}}>{guide.title}</h4>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}