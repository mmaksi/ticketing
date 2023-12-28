import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const request = async () => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oopss..</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>,
      );
    }
  };
  return { request, errors };
};

export default useRequest;
