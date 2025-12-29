'use client';

import ReactMarkdown from 'react-markdown';

interface JobDescriptionProps {
  description: string;
}

const JobDescription = ({ description }: JobDescriptionProps) => {
  return (
    <div className="prose w-full max-w-none py-16 text-16 font-500 leading-[160%] text-basic-black">
      <ReactMarkdown
        components={{
          a: ({ href, ...props }) => {
            const url = href ?? '';
            const onClick = () => {
              if (!url) return;
              // If external link handling is needed in the future, add it here
              // event.preventDefault();
              // event.stopPropagation();
              // handleExternalLink(url);
            };

            return (
              <a
                href={url}
                onClick={onClick}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            );
          },
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
};

export default JobDescription;
