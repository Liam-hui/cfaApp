import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import MyWebView from '@/components/MyWebView';
import { HOST } from '@/constants';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';

export default function CareersScreen() {

  const [mode, setMode] = useState<"jobSeeker" | "employer">("jobSeeker");

  return (
    <>
      {mode == "jobSeeker" 
        ? <MyWebView
          key={"jobSeeker"}
          uri={`${HOST}/for-job-seekers/`}
          headerAction={
            <TouchableOpacity
              style={{
                backgroundColor: Colors.blue,
                height: 35,
                paddingHorizontal: 10,
                borderRadius: 35,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                setMode("employer");
              }}
            >
              <Text style={{ color: "white" }}>{"For Employers"}</Text>
            </TouchableOpacity>
          }
        />
        : <MyWebView
          key={"employer"}
          uri={`${HOST}/for-employers/`}
          headerAction={
            <TouchableOpacity
              style={{
                backgroundColor: Colors.blue,
                height: 35,
                paddingHorizontal: 10,
                borderRadius: 35,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                setMode("jobSeeker");
              }}
            >
              <Text style={{ color: "white" }}>{"For Job Seekers"}</Text>
            </TouchableOpacity>
          }
        />
      }
    </>
  );
}

